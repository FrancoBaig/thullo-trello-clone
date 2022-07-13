import React from "react";

// Cloudinary
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";

// Import required qualifiers.
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

function ProfilePhoto({ upploadedImage }) {
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: "francobaigorria",
        },
    });
    console.log("render", upploadedImage);

    // Use the image with public ID, 'front_face'.
    const myImage = cld.image(upploadedImage);
    myImage
        .resize(
            thumbnail().width(40).height(40).gravity(focusOn(FocusOn.face()))
        ) // Crop the image.
        .roundCorners(byRadius(12));

    return <AdvancedImage cldImg={myImage} />;
}

export default ProfilePhoto;
