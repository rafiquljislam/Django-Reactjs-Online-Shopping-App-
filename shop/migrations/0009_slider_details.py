# Generated by Django 3.1.6 on 2021-02-17 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_slider_trendingproduct'),
    ]

    operations = [
        migrations.AddField(
            model_name='slider',
            name='details',
            field=models.TextField(blank=True, null=True),
        ),
    ]
