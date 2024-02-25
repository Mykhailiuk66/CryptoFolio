# Generated by Django 4.2.10 on 2024-02-23 10:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_watchlist_coins_watchlistcoin'),
    ]

    operations = [
        migrations.AddField(
            model_name='watchlist',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
