import type { Options } from 'execa'
import { execa } from 'execa'
import type { DargsFlags } from './utils'
import { args, isJSON } from './utils'

interface YtFlags {
  help?: boolean
  version?: boolean
  update?: boolean
  ignoreErrors?: boolean
  abortOnError?: boolean
  dumpUserAgent?: boolean
  listExtractors?: boolean
  extractorDescriptions?: boolean
  forceGenericExtractor?: boolean
  defaultSearch?: string
  ignoreConfig?: boolean
  configLocation?: string
  flatPlaylist?: boolean
  markWatched?: boolean
  noColor?: boolean
  proxy?: string
  socketTimeout?: number
  sourceAddress?: string
  forceIpv4?: boolean
  forceIpv6?: boolean
  geoVerificationProxy?: string
  geoBypass?: boolean
  geoBypassCountry?: string
  geoBypassIpBlock?: string
  playlistStart?: number
  playlistEnd?: number | 'last'
  playlistItems?: string
  matchTitle?: string
  rejectTitle?: string
  maxDownloads?: number
  minFilesize?: string
  maxFilesize?: string
  date?: string
  datebefore?: string
  dateafter?: string
  minViews?: number
  maxViews?: number
  matchFilter?: string
  noPlaylist?: boolean
  yesPlaylist?: boolean
  ageLimit?: number
  downloadArchive?: string
  includeAds?: boolean
  limitRate?: string
  retries?: number | 'infinite'
  skipUnavailableFragments?: boolean
  abortOnUnavailableFragment?: boolean
  keepFragments?: boolean
  bufferSize?: string
  noResizeBuffer?: boolean
  httpChunkSize?: string
  playlistReverse?: boolean
  playlistRandom?: boolean
  xattrSetFilesize?: boolean
  hlsPreferNative?: boolean
  hlsPreferFfmpeg?: boolean
  hlsUseMpegts?: boolean
  externalDownloader?: string
  externalDownloaderArgs?: string
  batchFile?: string
  id?: boolean
  output?: string
  outputNaPlaceholder?: string
  autonumberStart?: number
  restrictFilenames?: boolean
  noOverwrites?: boolean
  continue?: boolean
  noPart?: boolean
  noMtime?: boolean
  writeDescription?: boolean
  writeInfoJson?: boolean
  writeAnnotations?: boolean
  loadInfoJson?: string
  cookies?: string
  cacheDir?: string
  noCacheDir?: boolean
  rmCacheDir?: boolean
  writeThumbnail?: boolean
  writeAllThumbnails?: boolean
  listThumbnails?: boolean
  quiet?: boolean
  noWarnings?: boolean
  simulate?: boolean
  skipDownload?: boolean
  getUrl?: boolean
  getTitle?: boolean
  getId?: boolean
  getThumbnail?: boolean
  getDuration?: boolean
  getFilename?: boolean
  getFormat?: boolean
  dumpJson?: boolean
  dumpSingleJson?: boolean
  printJson?: boolean
  newline?: boolean
  noProgress?: boolean
  consoleTitle?: boolean
  verbose?: boolean
  dumpPages?: boolean
  writePages?: boolean
  printTraffic?: boolean
  callHome?: boolean
  encoding?: string
  noCheckCertificate?: boolean
  preferInsecure?: boolean
  userAgent?: string
  referer?: string
  addHeader?: string
  bidiWorkaround?: boolean
  sleepInterval?: number
  maxSleepInterval?: number
  format?: string
  allFormats?: boolean
  preferFreeFormats?: boolean
  listFormats?: boolean
  youtubeSkipDashManifest?: boolean
  mergeOutputFormat?: string
  writeSub?: boolean
  writeAutoSub?: boolean
  allSubs?: boolean
  listSubs?: boolean
  subFormat?: string
  subLang?: string
  username?: string
  password?: string
  twofactor?: string
  netrc?: boolean
  videoPassword?: string
  apMso?: string
  apUsername?: string
  apPassword?: string
  apListMso?: boolean
  extractAudio?: boolean
  audioFormat?: string
  audioQuality?: number
  recodeVideo?: string
  postprocessorArgs?: string
  keepVideo?: boolean
  noPostOverwrites?: boolean
  embedSubs?: boolean
  embedThumbnail?: boolean
  addMetadata?: boolean
  metadataFromFile?: string
  xattrs?: boolean
  fixup?: string
  preferAvconv?: boolean
  preferFfmpeg?: boolean
  ffmpegLocation?: string
  exec?: string
  convertSubs?: string
}
interface YtDlpEntry {
  __has_drm: boolean
  _last_playlist_index: number
  abr: number
  acodec: string
  bv_id: string
  cid: string
  description: string
  display_id: string
  duration: number
  duration_string: string
  dynamic_range: string
  ext: string
  height: number
  id: string
  resolution: string
  tags: string[]
  thumbnail: string
  timestamp: number
  title: string
  upload_date: string
  uploader: string
  width: number
}

interface YtDlpResponse {
  _type: string
  entries: YtDlpEntry[]
  epoch: number
  extractor: string
  extractor_key: string
  id: string
  original_url: string
  playlist_count: number
  title: string
  webpage_url: string
  webpage_url_basename: string
  webpage_url_domain: string
}

class YtDlp {
  binaryPath: string
  constructor(binaryPath: string) {
    this.binaryPath = binaryPath
  }

  exec(url: string, flags: YtFlags, options: Options = {}) {
    // TODO: remove as  DargsFlags
    return execa(this.binaryPath, args(url, flags as DargsFlags), options)
  }

  async execDumpSingleJson(url: string, options: Options = {}): Promise<YtDlpResponse> {
    const { stdout } = await this.exec(url, { dumpSingleJson: true }, options)
    return (isJSON(stdout) ? JSON.parse(stdout) : stdout)
  }
}

export {
  YtFlags,
  YtDlp,
}
