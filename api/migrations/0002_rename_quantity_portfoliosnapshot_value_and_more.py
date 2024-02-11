# Generated by Django 5.0.2 on 2024-02-10 18:38

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='portfoliosnapshot',
            old_name='quantity',
            new_name='value',
        ),
        migrations.AddField(
            model_name='portfolio',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='notes',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='portfolioholding',
            name='sale_price',
            field=models.DecimalField(blank=True, decimal_places=20, max_digits=40, null=True),
        ),
    ]
