/**
 * @typedef {Object} UpcomingVideo
 * @property {string} VideoId
 * @property {string} Title
 * @property {string} ThumbnailUrl
 * @property {boolean} IsPremiere
 * @property {string} [PublishedAt]
 * @property {string} [ScheduledStartTime]
 * @property {string} [ActualStartTime]
 * @property {string} [ActualEndTime]
 * @property {string} [AddedAt]
 * @property {boolean} [Live]
 */

/**
 * @typedef {Object} ActiveVideo
 * @property {string} VideoId
 * @property {string} Title
 * @property {string} ThumbnailUrl
 * @property {boolean} IsPremiere
 * @property {string} [PublishedAt]
 * @property {string} [ScheduledStartTime]
 * @property {string} [ActualStartTime]
 * @property {string} [ActualEndTime]
 * @property {string} [AddedAt]
 * @property {boolean} [Live]
 */

/**
 * @typedef {Object} PastVideo
 * @property {string} VideoId
 * @property {string} Title
 * @property {string} ThumbnailUrl
 * @property {boolean} WasPremiere
 * @property {string} [PublishedAt]
 * @property {string} [ScheduledStartTime]
 * @property {string} [ActualStartTime]
 * @property {string} [ActualEndTime]
 * @property {string} [EndedAt]
 */

/**
 * @typedef {Object} Channel
 * @property {string} ChannelName
 * @property {string} LastActivityAt
 * @property {string} [ChannelDescription]
 * @property {string} [ChannelCity]
 * @property {string} [ChannelType]
 * @property {string} [ChannelLiveUrl]
 * @property {string} [ChannelImgUrl]
 * @property {string} [ChannelBannerUrl]
 * @property {Object.<string, UpcomingVideo>} [Upcoming]
 * @property {Object.<string, ActiveVideo>} [Actives]
 * @property {Object.<string, PastVideo>} [Past]
 */