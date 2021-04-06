from django.db import models
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage


### The models module is responsible for defining the schema for the Roddi application ###
### The django models defined here are converted into tables with appropriate constraints in MySQL ### 
### For this project, Django's default User model is used, and is therefore not present in this module
### Django will automatically define a generated primary key (integer) for every table ###


#Defines the blueprint for all estates, has an N:M relation to Users.
class Estate(models.Model):
    name = models.CharField(max_length=50, unique=True)
    status = models.BooleanField()
    users = models.ManyToManyField(User, blank=True, through="User_In_Estate")
    date_created = models.DateField(auto_now=True)


#Django auto-creates these inter-tables using the defined relations, but in certain cases 
#these standard tables lack the required info or constraints. Therefore they are sometimes 
#defined manually.
class User_In_Estate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)

    class Meta:
        unique_together=(('user', 'estate'),)


#Helper-function for determining where images for items are stored in backend.
def upload_to(instance, filename):
    return '{filename}'.format(filename=filename)


#Blueprint for all Items. N:M relation to Users (voters) and 1:N relation to Estate.
class Item(models.Model):
    name = models.CharField(max_length=55)
    description = models.CharField(max_length=255)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_to, default = "default")
    voters = models.ManyToManyField(User, blank=True, through="User_Item")

    class Meta:
        unique_together = (('name', 'estate'),)


#Once more an inter-table having to be manually defined, this time to ensure voting logic and
#timestamps for statistics.
class User_Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    donate = models.BooleanField(default=False)
    discard = models.BooleanField(default=False)
    wanted = models.BooleanField(default=False)
    wanted_level = models.IntegerField(default=0)

    date_created = models.DateField(auto_now=True)

    class Meta:
        unique_together = (('user', 'item'))
