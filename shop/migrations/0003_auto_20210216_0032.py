# Generated by Django 3.1.6 on 2021-02-15 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_auto_20210216_0029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='mobile',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
