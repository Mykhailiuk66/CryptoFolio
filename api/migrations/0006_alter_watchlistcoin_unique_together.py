# Generated by Django 4.2.10 on 2024-03-17 08:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_coin_slug_alter_portfolioholding_coin_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='watchlistcoin',
            unique_together={('watchlist', 'coin', 'exchange')},
        ),
    ]
