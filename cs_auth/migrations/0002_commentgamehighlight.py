# Generated by Django 4.0.5 on 2022-09-18 06:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cs_auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentGameHighlight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('datetime', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('live_game', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='cs_auth.livegame')),
            ],
        ),
    ]
