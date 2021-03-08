# Generated by Django 3.1.6 on 2021-02-23 15:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Estate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('status', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('description', models.CharField(max_length=255)),
                ('estate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.estate')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('password', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User_Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('donate', models.BooleanField(default=False)),
                ('discard', models.BooleanField(default=False)),
                ('wanted', models.BooleanField(default=False)),
                ('wanted_level', models.IntegerField(default=0)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.item')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='User_In_Estate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.estate')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.AddField(
            model_name='item',
            name='voters',
            field=models.ManyToManyField(blank=True, through='api.User_Item', to='api.User'),
        ),
        migrations.AddField(
            model_name='estate',
            name='users',
            field=models.ManyToManyField(blank=True, through='api.User_In_Estate', to='api.User'),
        ),
        migrations.AlterUniqueTogether(
            name='item',
            unique_together={('name', 'estate')},
        ),
    ]