import { describe, expect, it } from 'vitest'
import { YtDlp } from '../src/index'
import { args } from '../src/utils'
// Edit an assertion and save to see HMR in action

const BILIBILI_URL = 'https://www.bilibili.com/video/BV1nY4y1a7pG'
const WEIBO_URL = 'https://weibo.com/6275294458/Fp6RGfbff?type=comment'

describe('utils', () => {
  it('args should be right', () => {
    const output = args(BILIBILI_URL, {
      dumpSingleJson: true,
    })
    expect(output).toEqual([BILIBILI_URL, '--dump-single-json'])
  })
})

describe('YtDlp', () => {
  it('should be defined', () => {
    expect(YtDlp).toBeDefined()
  })

  it.skip('should be can output json', async() => {
    const ytDlp = new YtDlp('yt-dlp')
    const output = await ytDlp.execDumpSingleJson(BILIBILI_URL)
    expect(output).toBeDefined()
  })
})

describe('EveryVideoSource', () => {
  it.skip.concurrent('bilibili', async() => {
    const ytDlp = new YtDlp('yt-dlp')
    const output = await ytDlp.execDumpSingleJson(BILIBILI_URL)
    expect(output).toMatchSnapshot()
  })
  it.skip.concurrent('weibo', async() => {
    const ytDlp = new YtDlp('yt-dlp')
    const output = await ytDlp.execDumpSingleJson(WEIBO_URL)
    expect(output).toMatchSnapshot()
  })
})
