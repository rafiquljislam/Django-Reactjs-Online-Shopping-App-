# Generated by Django 3.1.6 on 2021-02-16 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_auto_20210216_1132'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='tags',
            field=models.TextField(blank=True, null=True),
        ),
    ]
