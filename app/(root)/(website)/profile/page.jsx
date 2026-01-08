import UserPanalLayout from '@/components/Application/Website/UserPanalLayout';
import WebsiteBreadcrum from '@/components/Application/Website/WebsiteBreadcrum';
import React from 'react'
const breadcrumdata = {
    title: "My Profile",
    links: [
        { name: "My Profile" }

    ]
};
const Profile = () => {
    return (
        <div>
            <WebsiteBreadcrum props={breadcrumdata} />
            <UserPanalLayout>

                Profile Page
            </UserPanalLayout>
        </div>
    )
}

export default Profile
