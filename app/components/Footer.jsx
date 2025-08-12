import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="bg-black">
        <div className="max-w-7xl md:mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <Image
            src="/img/footer.jpeg"
            alt="Logo"
            className="w-64 mb-2"
            width={500}
            height={500}
          />
          <div className="flex justify-center text-white gap-4 mb-2 pt-5 md:pt-0">
            <div className="p-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="p-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
              <FaYoutube />
            </div>
            <div className="p-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
              <FaTwitter />
            </div>
            <div className="p-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
              <FaInstagram />
            </div>
            <div className="p-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#8e9193]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-14  grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div className=" md:border-r border-white">
            <p>সম্পাদক ও প্রকাশক: আমিন</p>
          </div>

          <div className="col-span-2 py-5 md:py-0">
            <div className="grid grid-cols-3 gap-4 lg:text-center text-black font-medium  h-full">
              <div className="space-y-3 md:border-r border-white">
                <p>সারাদেশ</p>
                <p>রাজনীতি</p>
                <p>আন্তর্জাতিক</p>
              </div>
              <div className="space-y-3 md:border-r border-white">
                <p>স্বাস্থ্য</p>
                <p>খেলা</p>
                <p>বিনোদন</p>
              </div>
              <div className="space-y-3 md:border-r border-white">
                <p>লাইফস্টাইল</p>
                <p>শিক্ষা</p>
                <p>অর্থনীতি</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p>ঠিকানা: হাউজ:১৯, ঢাকা-১২১৩।</p>
            <p className="mt-2">বিজ্ঞাপন ও যোগাযোগ: +৮৮-০১৯৮০০০০০</p>
            <p>ই-মেইল: info@dailynews.com</p>
          </div>
        </div>
      </div>

      <div className="bg-black text-white text-center text-sm py-4 border-t border-gray-700">
        <p>
          © ২০২৫ Daily News কর্তৃক সর্বস্বত্ব সংরক্ষিত | ডেভেলপমেন্ট করেছে-
          ক্রিয়েটিভ সফটওয়্যার
        </p>
      </div>
    </footer>
  );
};

export default Footer;
