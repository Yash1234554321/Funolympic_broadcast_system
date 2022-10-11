from django.db import models
from django.contrib.auth.models import User


class LiveGame(models.Model):
    game_title = models.CharField(max_length=100)
    team1 = models.CharField(max_length=100)
    team2 = models.CharField(max_length=100)
    broadcast_date_and_time = models.DateTimeField()
    broadcast_url = models.URLField()
    thumbnail_image = models.ImageField(
        upload_to="thumbnail_images", blank=True)

    def __str__(self):
        return self.game_title

class GameHighlight(models.Model):
    game_title = models.CharField(max_length=100)
    team1 = models.CharField(max_length=100)
    team2 = models.CharField(max_length=100)
    team1_score = models.IntegerField()
    team2_score = models.IntegerField()
    team1_logo = models.ImageField(upload_to="logo_images", blank=True)
    team2_logo = models.ImageField(upload_to="logo_images", blank=True)
    broadcast_url = models.URLField()

    def __str__(self):
        return self.game_title

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    live_game = models.ForeignKey(LiveGame, on_delete=models.CASCADE,default=None)
    content = models.TextField()
    datetime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class CommentGameHighlight(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    live_game = models.ForeignKey(LiveGame, on_delete=models.CASCADE,default=None)
    content = models.TextField()
    datetime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content



