'use client';
import InfoBox from '@repo/ui/infobox';

const UserInfo = () => {
  return (
    <InfoBox
      title="Thông tin người dùng"
      caption="Chuyển tiền giữa các tài khoản nội bộ của doanh nghiệp."
      icon="ICON_BILL"
      onClick={() => alert('23456')}
    />
  );
};

export default UserInfo;
