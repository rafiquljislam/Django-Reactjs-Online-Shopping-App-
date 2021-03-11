# Generated by Django 3.1.6 on 2021-02-20 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0012_slider_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='Address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='gender',
            field=models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=6, null=True),
        ),
    ]
