# Generated by Django 2.2.17 on 2021-04-05 00:11

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0005_auto_20210405_0307'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='activation_key_expires',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 7, 0, 11, 36, 312181, tzinfo=utc)),
        ),
    ]
