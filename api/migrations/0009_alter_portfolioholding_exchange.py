# Generated by Django 4.2.10 on 2024-03-24 07:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_watchlistcoin_exchange'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolioholding',
            name='exchange',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, to='api.exchange'),
            preserve_default=False,
        ),
    ]
