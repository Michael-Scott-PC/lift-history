import calendar
from datetime import datetime
from datetime import date
from calendar import Calendar
import json


class FullCalendar(calendar.TextCalendar):
    """Create a full 12 month calendar for the current year"""

    this_year = date.today().year

    def __init__(self, firstweekday=6):
        """ Make Sunday the first day of the week for every instance """
        self.firstweekday = firstweekday
        return

    def generate_month_lst(self):
        """ Create a list of strings containing the full month names """
        full_month_names = calendar.month_name
        month_lst = []
        for month in full_month_names:
            month_lst.append(month)
        del month_lst[0]
        return month_lst

    def full_month_names_numbers_dict(self):
        """ Assign each month to a number value """
        months = self.generate_month_lst()
        num_keys_lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        indexed_months_dict = dict(zip(months, num_keys_lst))
        return indexed_months_dict

    def generate_abbr_month_lst(self):
        """ Create a list of strings containing the abbr month names """
        abbr_month_names = calendar.month_abbr
        abbr_month_lst = []
        for abbr_month in abbr_month_names:
            abbr_month_lst.append(abbr_month)
        del abbr_month_lst[0]
        return abbr_month_lst

    def abbr_month_numbers_dict(self):
        """ Assign each abbreviated month to a number value """
        abbr_month = self.generate_abbr_month_lst()
        num_keys_lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        indexed_abbr_month_dict = dict(zip(abbr_month, num_keys_lst))
        return indexed_abbr_month_dict

    def generate_abbr_weekday_lst(self):
        """ Create a list of weekday name abbreviations containing 2 letters and make Su 0 index. """
        abbr_weekday_lst = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        return abbr_weekday_lst

    def generate_monthdays_lst(self):
        """ Create a list of sublists containing monthday integers for each month """
        this_year = date.today().year
        cal = calendar.Calendar(firstweekday=6)
        flat_lst = []
        for month in range(1, 13):
            days = cal.monthdayscalendar(this_year, month)
            f_lst = [num for sublist in days for num in sublist]
            flat_lst.append(f_lst)
        return flat_lst

    def create_month_days_dict(self, month_lst, flat_lst):
        """ Merge the month and days lists into a dictionary. key = month, value = list of days(ints)"""
        month_days_dict = {}
        x = 1
        y = 0
        while x < 13:
            for month in month_lst:
                if month not in month_days_dict:
                    for days_lst in flat_lst[y:x]:
                        month_days_dict[month] = days_lst
                        x = x + 1
                        y = y + 1
        return month_days_dict


custom_calendar = FullCalendar()
full_month_names = custom_calendar.generate_month_lst()

full_month_names_w_nums = custom_calendar.full_month_names_numbers_dict()

abbr_months = custom_calendar.generate_abbr_month_lst()

abbr_weekdays = custom_calendar.generate_abbr_weekday_lst()

month_days = custom_calendar.generate_monthdays_lst()

months_and_days = custom_calendar.create_month_days_dict(abbr_months, month_days)


with open('./frontend/full-month-names.json', 'w') as f:
    json.dump(full_month_names, f)

with open('./frontend/full-month-names-w-nums.json', 'w') as f:
    json.dump(full_month_names_w_nums, f)

with open('./frontend/abbr-months.json', 'w') as f:
    json.dump(abbr_months, f)

with open('./frontend/abbr-weekdays.json', 'w') as f:
    json.dump(abbr_weekdays, f)

with open('./frontend/month-days.json', 'w') as f:
    json.dump(month_days, f)

with open('./frontend/months-and-days.json', 'w') as f:
    json.dump(months_and_days, f)