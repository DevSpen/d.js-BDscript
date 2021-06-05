module.exports = {
    "uses": {
        description: "The uses for this invite",
        code: ".uses || 0",
    },
    "userID": {
        description: "The person that created this invite",
        code: ".inviter?.id"
    },
    "guildID": {
        description: "the guild this invite belongs to",
        code: ".guild?.id"
    },
    "channelID": {
        description: "the channel this invite was created in",
        code: ".channel?.id"
    },
    "url": {
        description: "full link of the invite",
        code: ".url"
    },
    "code": {
        code: ".code",
        description: "the invite code"
    },
    "expiresAt": {
        code: ".expiresAt?.toISOString()",
        description: "the invite expiration date"
    },
    "expiresTimestamp": {
        code: ".expiresTimestamp",
        description: "the invite expiration date in milliseconds"
    },
    "maxUses": {
        code: ".maxUses",
        description: "the max uses for this invite"
    },
    "memberCount": {
        code: ".memberCount",
        description: "the guild member count"
    },
    "presenceCount": {
        code: ".presenceCount",
        description: "the presence count of the guild"
    },
    "maxAge": {
        code: ".maxAge",
        description: "the duration of the invite, 0 for forever"
    },
    "temporary": {
        code: ".temporary",
        description: "whether this invite is temporary"
    },
    "deletable": {
        code: ".deletable",
        description: "whether this invite is deletable"
    }
}