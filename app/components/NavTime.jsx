import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/bn';

// বাংলা মাস তালিকা
const banglaMonths = [
  'জ্যৈষ্ঠ',
  'আষাঢ়',
  'শ্রাবণ',
  'ভাদ্র',
  'আশ্বিন',
  'কার্তিক',
  'অগ্রহায়ণ',
  'পৌষ',
  'মাঘ',
  'ফাল্গুন',
  'চৈত্র',
  'বৈশাখ',
];

const banglaMonthStart = [14, 15, 15, 16, 16, 16, 16, 16, 16, 15, 14, 14];

function getBanglaDate(date) {
  let d = date.date();
  let m = date.month();
  let y = date.year();

  if (d < banglaMonthStart[m]) {
    m = (m + 11) % 12;
    if (m === 11) y -= 1;
  }

  let banglaYear = y - 593;
  let banglaMonth = banglaMonths[(m + 8) % 12];
  let banglaDay =
    d >= banglaMonthStart[date.month()]
      ? d - banglaMonthStart[date.month()] + 1
      : date.daysInMonth(date.month() - 1) - (banglaMonthStart[m] - d) + 1;

  return `${date
    .locale('bn')
    .format('dddd')} ${banglaDay} ${banglaMonth} ${banglaYear}`;
}

function toBanglaNumber(num) {
  return num.toString().replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d]);
}

function ordinalBn(num) {
  return toBanglaNumber(num) + 'ই';
}

const NavTime = () => {
  const [time, setTime] = useState({
    gregorian: '',
    bangla: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();

      // 1️⃣ Gregorian
      const gregorianMonthsBn = [
        'জানুয়ারি',
        'ফেব্রুয়ারি',
        'মার্চ',
        'এপ্রিল',
        'মে',
        'জুন',
        'জুলাই',
        'আগস্ট',
        'সেপ্টেম্বর',
        'অক্টোবর',
        'নভেম্বর',
        'ডিসেম্বর',
      ];
      const gDate = `${ordinalBn(now.date())} ${
        gregorianMonthsBn[now.month()]
      } ${toBanglaNumber(now.year())} খ্রিষ্টাব্দ`;

      // 2️⃣ Bangla Date
      const bDate = getBanglaDate(now);

      setTime({
        gregorian: gDate,
        bangla: bDate,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" ml-2">
      <span>আজ {time.gregorian}</span> <span className="sm:hidden"></span> |{' '}
      <span>{time.bangla} বঙ্গাব্দ</span>
    </div>
  );
};

export default NavTime;
