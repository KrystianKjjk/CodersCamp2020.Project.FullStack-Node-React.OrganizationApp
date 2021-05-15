class Container {
  [prop: string]: any
  private dependencies: object
  constructor() {
    this.dependencies = {}
  }

  declare(name: string, cb: (c: Container) => any) {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this.dependencies.hasOwnProperty(name)) {
          this.dependencies[name] = cb(this)
        }

        return this.dependencies[name]
      },
      configurable: true,
      enumerable: true,
    })

    return this
  }
}

export default Container
