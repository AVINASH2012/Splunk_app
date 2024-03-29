# Generated by Django 5.0.1 on 2024-01-08 21:27

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_splunkobject_custom_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='splunkobject',
            name='action_type',
            field=models.CharField(choices=[('delete', 'delete'), ('Share', 'Share')], default=django.utils.timezone.now, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='splunkobject',
            name='custom_fields',
            field=models.CharField(choices=[('top secret', 'Top Secret'), ('top secret/sci', 'Top Secret/SCI'), ('secret', 'Secret'), ('confidential', 'Confidential'), ('unclassified', 'Unclassified')], max_length=20),
        ),
    ]
