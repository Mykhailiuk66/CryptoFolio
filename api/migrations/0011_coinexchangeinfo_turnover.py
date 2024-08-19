# Generated by Django 4.2.10 on 2024-07-09 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_coinexchangeinfo_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='coinexchangeinfo',
            name='turnover',
            field=models.DecimalField(blank=True, decimal_places=10, max_digits=40, null=True),
        ),
    ]