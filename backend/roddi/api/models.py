from django.db import models


# Create your models here.
##Dette er egentlig utdatert mtp Victorias token logikk, men lettere å jobbe med for frontend
class User(models.Model):
    name = models.CharField(max_length=55)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=100, unique=True)


class Estate(models.Model):
    name = models.CharField(max_length=50, unique=True)
    status = models.BooleanField()
    users = models.ManyToManyField(User, blank=True, through="User_In_Estate")


class Item(models.Model):
    name = models.CharField(max_length=55)
    description = models.CharField(max_length=255)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)
    voters = models.ManyToManyField(User, blank=True, through="User_Item")

    class Meta:
        unique_together = (('name', 'estate'),)



class User_In_Estate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)


    class Meta:
        unique_together=(('user', 'estate'),)
    


class User_Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    donate = models.BooleanField(default=False)
    discard = models.BooleanField(default=False)
    wanted = models.BooleanField(default=False)
    wanted_level = models.IntegerField(default=0)
