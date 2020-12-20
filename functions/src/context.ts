export interface Context {
  pandaScoreKey: string
  cache: {
    [url: string]: any
  }
}
