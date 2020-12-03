# ReadMe

## Feature List

### MVP

- User accounts
- Upload Videos
- Comment on Videos
- Follow Users
- Feed (based on follows)
- Likes (video) (maybe stretch)

### Stretch

- Feed (based on views/content - available when not logged in)
- Playlists
- Tags
- Watch History

## Routes

### FE Routes

- / - Home page (feed)
- /user/user_id - user page
- /me - current logged in user personal page/settings
- /video/video_id - watch page for video

### BE Routes

api/...

GET

- video/video_id/ - fetch all info needed for video page
- user/user_id/videos - fetch user's uploaded videos
- user/user_id/comments - fetch user's comments
- user/user_id/likes - fetch videos that user has liked
- user/user_id/following - fetch all followed users (by user_id user)

POST

- login
- signup
- video - upload
- video/video_id - update info on video_id (new view/like/comment)

PUT
- user/user_id - edit, usersettings
- video/video_id/edit - edit video (title, description)