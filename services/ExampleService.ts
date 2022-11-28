interface ExampleServiceParameters {
  url: string
}

class ExampleService {
  constructor() {}

  async exampleMethod({ url }: ExampleServiceParameters): Promise<void> {
    console.log(url)
  }
}

const instance = new ExampleService()
Object.freeze(instance)

export default instance
