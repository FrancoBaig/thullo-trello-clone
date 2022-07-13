import React from "react";

// Cloudinary
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

// Import required qualifiers.
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

function ProfilePhoto({ upploadedImage }) {
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: "francobaigorria",
        },
    });

    // Use the image with public ID, 'upploadedImage'.
    const myImage = cld.image(upploadedImage);
    myImage
        .resize(
            thumbnail().width(45).height(45).gravity(focusOn(FocusOn.face()))
        ) // Crop the image.
        .roundCorners(byRadius(12));

    return <AdvancedImage cldImg={myImage} />;
}

export default ProfilePhoto;
