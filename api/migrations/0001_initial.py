# Generated by Django 5.0.2 on 2024-02-10 12:55

import datetime
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Exchange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('logo', models.ImageField(blank=True, default='exchanges/default.png', null=True, upload_to='exchanges/')),
            ],
        ),
        migrations.CreateModel(
            name='Coin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('short_name', models.CharField(max_length=20)),
                ('logo', models.ImageField(blank=True, default='coins/default.png', null=True, upload_to='coins/')),
            ],
            options={
                'unique_together': {('name', 'short_name')},
            },
        ),
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=300)),
                ('notes', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'name')},
            },
        ),
        migrations.CreateModel(
            name='PortfolioHolding',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=20)),
                ('purchase_price', models.DecimalField(decimal_places=20, max_digits=40)),
                ('sale_price', models.DecimalField(decimal_places=20, max_digits=40)),
                ('purchase_date', models.DateField(blank=True, default=datetime.date.today, null=True)),
                ('sale_date', models.DateField(blank=True, null=True)),
                ('coin', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='api.coin')),
                ('exchange', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.exchange')),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='holdings', to='api.portfolio')),
            ],
        ),
        migrations.CreateModel(
            name='PortfolioSnapshot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateField(auto_now_add=True)),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=20)),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='snapshots', to='api.portfolio')),
            ],
        ),
        migrations.CreateModel(
            name='Watchlist',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('coins', models.ManyToManyField(to='api.coin')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
