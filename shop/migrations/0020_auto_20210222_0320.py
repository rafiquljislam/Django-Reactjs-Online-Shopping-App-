# Generated by Django 3.1.6 on 2021-02-21 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0019_order_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
