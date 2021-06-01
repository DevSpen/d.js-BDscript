module.exports = {
    "uses": ".uses || 0",
    "userID": ".inviter?.id",
    "guildID": ".guild?.id",
    "channelID": ".channel?.id",
    "url": ".url",
    "code": ".code",
    "expiresAt": ".expiresAt?.toISOString()",
    "expiresTimestamp": ".expiresTimestamp",
    "maxUses": ".maxUses",
    "memberCount": ".memberCount",
    "presenceCount": ".presenceCount",
    "maxAge": ".maxAge",
    "temporary": ".temporary",
    "deletable": ".deletable"
}