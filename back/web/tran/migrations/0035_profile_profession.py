# Generated by Django 2.2.3 on 2019-09-11 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tran', '0034_notice'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profession',
            field=models.CharField(blank=True, max_length=24),
        ),
    ]
