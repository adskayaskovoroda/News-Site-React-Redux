# Generated by Django 3.1.2 on 2020-10-22 06:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news_app', '0002_auto_20201022_0607'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='news',
            name='tags',
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]
