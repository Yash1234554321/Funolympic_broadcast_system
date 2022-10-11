from django.contrib import admin
from django.contrib.auth.models import Group
from .models import LiveGame,GameHighlight, Comment

# Register your models here.
admin.site.unregister(Group)
class LiveGameAdmin(admin.ModelAdmin):
    list_display = ("game_title", "team1","team2","broadcast_date_and_time")

class GameHighlightAdmin(admin.ModelAdmin):
    list_display = ("game_title", "team1","team1_score","team2","team2_score")

admin.site.register(LiveGame,LiveGameAdmin)
admin.site.register(GameHighlight,GameHighlightAdmin)
admin.site.register(Comment)
