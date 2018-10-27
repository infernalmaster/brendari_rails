export default function () {
  const canvas = document.getElementById('game')
  const dpr = window.devicePixelRatio || 1

  const world = {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight
  }

  canvas.width = world.width * dpr
  canvas.height = world.height * dpr

  /**
   * @type {CanvasRenderingContext2D}
   */
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.font = '40px Arial'
  ctx.strokeStyle = '#454545'

  const figureTemplates = [
    [[1, 1], [1, 1]],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 1]]
  ]

  function createScore() {
    return {
      data: 0,
      draw: function (x, y) {
        ctx.fillStyle = 'white'
        ctx.fillText(`${this.data}`, x, y)
      },
      inc: function () {
        this.data++
      }
    }
  }

  function createGrid(cols, rows) {
    const data = new Array(rows).fill(0).map(() => new Array(cols).fill(0))

    return {
      data,
      score: createScore(),
      draw: function () {
        drawData(this.data)
        drawGridLines()
        this.score.draw(10, 60)
      },
      update: function () {
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
          const row = this.data[rowIndex]
          if (row.every(c => c === 1)) {
            this.score.inc()

            let index = rowIndex
            while (index > 0) {
              this.data[index] = this.data[index - 1]
              index--
            }

            this.data[0] = row.map(() => 0)
          }
        }
      },
      copyFigure: function (figure) {
        const size = figure.data.length
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (figure.data[i][j] === 1) {
              const cellX = j + figure.x
              const cellY = i + figure.y

              this.data[cellY][cellX] = 1
            }
          }
        }
      }
    }
  }

  const cols = 10
  const cellSize = world.width / cols
  const paddingBot = 152
  const rows = Math.ceil((world.height - paddingBot) / cellSize)
  const maxX = cellSize * cols
  const maxY = cellSize * rows

  const delta = rows * cellSize + paddingBot - world.height
  ctx.translate(0, -delta)

  let grid
  let figure
  let nextFigureData
  let gameOver

  function createFigure(data) {
    let moveDownTime = new Date()

    return {
      data,
      x: 3,
      y: 0,
      draw: function () {
        ctx.save()
        ctx.translate(this.x * cellSize, this.y * cellSize)
        drawData(this.data)
        ctx.restore()
      },
      left: function () {
        const newX = this.x - 1
        if (this.canMoveToNewPosition(newX, this.y, this.data)) {
          this.x = newX
        }
      },
      right: function () {
        const newX = this.x + 1
        if (this.canMoveToNewPosition(newX, this.y, this.data)) {
          this.x = newX
        }
      },
      down: function () {
        const newY = this.y + 1
        if (this.canMoveToNewPosition(this.x, newY, this.data)) {
          this.y = newY
        }
      },
      fall: function () {
        const newY = this.y + 1
        if (this.canMoveToNewPosition(this.x, newY, this.data)) {
          this.y = newY
          this.fall()
        }
      },
      rotate: function () {
        let rotated = rotate(this.data)

        if (this.canMoveToNewPosition(this.x, this.y, rotated)) {
          this.data = rotated
        }
      },

      update: function (done) {
        const current = new Date()

        if (current - moveDownTime > 400) {
          moveDownTime = current
          const newY = this.y + 1
          if (this.canMoveToNewPosition(this.x, newY, this.data)) {
            this.y = newY
          } else {
            done()
          }
        }
      },
      canMoveToNewPosition: function (x, y, data) {
        const size = data.length
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const cell = data[i][j]
            if (cell === 1) {
              const cellX = j + x
              const cellY = i + y

              if (cellX < 0 || cellX >= cols) {
                return false
              }
              if (cellY === rows) {
                return false
              }

              if (grid.data[cellY][cellX] === 1) {
                return false
              }
            }
          }
        }

        return true
      }
    }
  }

  function listenToKeyboard() {
    document.addEventListener('keydown', e => {
      if (!figure) return
      if (e.key === 'w' || e.key === 'ArrowUp') {
        figure.rotate()
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        figure.down()
      } else if (e.key === ' ') {
        figure.fall()
      } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        figure.left()
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        figure.right()
      }
    })
  }
  listenToKeyboard()

  function loop() {
    if (!gameOver) {
      requestAnimationFrame(loop)
    }

    ctx.clearRect(0, 0, world.width, world.height)

    grid.update()
    figure.update(() => {
      grid.copyFigure(figure)
      figure = createFigure(nextFigureData)
      nextFigureData = createRandomFigureData(figureTemplates)

      if (!figure.canMoveToNewPosition(figure.x, figure.y, figure.data)) {
        figure.draw()
        gameOver = true
      }
    })

    figure.draw()
    grid.draw()

    drawNextFigure(nextFigureData)

    if (gameOver) {
      ctx.fillStyle = 'red'
      ctx.textAlign = 'center'
      ctx.fillText('Game Over', maxX / 2, maxY / 2)
      ctx.fillStyle = 'white'
      ctx.textAlign = 'left'

      setTimeout(() => {
        restart()
      }, 2000)
    }
  }

  function restart() {
    grid = createGrid(cols, rows)
    figure = createFigure(createRandomFigureData(figureTemplates))
    nextFigureData = createRandomFigureData(figureTemplates)
    gameOver = false
    requestAnimationFrame(loop)
  }
  restart()

  // helpers
  function drawData(data) {
    data.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === 1 || cell === 2) {
          let x = columnIndex * cellSize
          let y = rowIndex * cellSize
          ctx.fillStyle = cell === 1 ? 'white' : 'red'
          ctx.fillRect(x, y, cellSize, cellSize)
        }
      })
    })
  }

  function drawGridLines() {
    ctx.beginPath()
    for (let i = 0; i <= cols; i++) {
      const x = i * cellSize
      ctx.moveTo(x, 0)
      ctx.lineTo(x, maxY)
    }
    for (let i = 0; i <= rows; i++) {
      const y = i * cellSize
      ctx.moveTo(0, y)
      ctx.lineTo(maxX, y)
    }
    ctx.stroke()
  }

  function rotate(data) {
    let rotated = clone(data)

    const size = data.length
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        rotated[i][j] = data[size - j - 1][i]
      }
    }

    return rotated
  }

  function mirror(data) {
    return data.map(row => row.reverse())
  }

  function rnd(max) {
    return Math.round(Math.random() * max)
  }
  function clone(data) {
    return JSON.parse(JSON.stringify(data))
  }

  function createRandomFigureData(figureTemplates) {
    let template = clone(figureTemplates[rnd(figureTemplates.length - 1)])

    for (let i = 0; i < rnd(4); i++) {
      template = rotate(template)
    }
    if (Math.random() > 0.5) {
      template = mirror(template)
    }

    return template
  }

  function drawNextFigure(nextFigureData) {
    ctx.save()
    ctx.translate(maxX - cellSize * 2, cellSize)
    ctx.scale(0.5, 0.5)
    drawData(nextFigureData)
    ctx.restore()
  }
}
