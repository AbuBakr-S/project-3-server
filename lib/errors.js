
export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
  }
}

export class NotValid extends Error {
  constructor() {
    super()
    this.name = 'NotValid'
  }
}

export class NotComplete extends Error {
  constructor() {
    super()
    this.name = 'NotComplete'
  }
}

export class NotAuthorized extends Error {
  constructor() {
    super()
    this.name = 'NotAuthorized'
  }
}


