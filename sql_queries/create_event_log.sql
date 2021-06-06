create table dbo.event_log (
  event_id int NOT NULL identity primary key,
  match_id  int not null references dbo.matches(match_id),
  minute_event int not null,
	description_event varchar(255)
)
