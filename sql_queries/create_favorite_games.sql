create table dbo.favorite_matches (
  user_id int not null references dbo.users(user_id),
  match_id  int not null references dbo.matches(match_id),
  date_match datetime not null
  constraint pk_favorite_matches primary key(user_id, match_id)
)