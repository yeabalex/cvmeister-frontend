import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ImageUploadForm } from "./image-upload";
import { Textarea } from "@nextui-org/input";
import { useAppContext } from "@/context";
import { sendPersonalInfo } from "./api/personal-info-api";
import { getPersonalInfo } from "./api/personal-info-api";

export interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  aboutMe: string;
  email: string;
  phoneNumber: string;
  linkedin: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  image: string;
}

export default function PersonalInfo() {
  const [data, setData] = useState<UserData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    aboutMe: "",
    email: "",
    phoneNumber: "",
    linkedin: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    image: "",
  });

  const { image, setImage } = useAppContext();
  data.image = image;

  useEffect(() => {
    async function fetchUserInfo() {
      if (await getPersonalInfo()) {
        const userData: UserData = await getPersonalInfo();
        setImage(userData.image);
        setData((prev) => ({ ...prev, ...userData }));
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <form
      className="my-8"
      onSubmit={(e) => {
        handleSubmit(e, data);
      }}
    >
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 p-5">
        <ImageUploadForm />
        <LabelInputContainer>
          <Label htmlFor="firstname" className="">
            First name
          </Label>
          <Input
            id="firstname"
            placeholder="Tyler"
            type="text"
            required
            value={data.firstName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="lastname">Last name</Label>
          <Input
            id="lastname"
            placeholder="Durden"
            type="text"
            required
            value={data.lastName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </LabelInputContainer>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-2  px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="date">Date of birth</Label>
          <Input
            id="date"
            type="date"
            value={
              data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+12345678"
            type="text"
            value={data.phoneNumber}
            onChange={(e) =>
              setData((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
          />
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2 px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="linkedin">Linkedin</Label>
          <Input
            id="linkedin"
            placeholder="Handle"
            type="text"
            value={data.linkedin}
            onChange={(e) =>
              setData((prev) => ({ ...prev, linkedin: e.target.value }))
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="www.abc.com"
            type="text"
            value={data.website}
            onChange={(e) =>
              setData((prev) => ({ ...prev, website: e.target.value }))
            }
          />
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2 mb-4 px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address1">Address Line 1</Label>
          <Input
            id="address1"
            placeholder="32 XYZ Street"
            type="text"
            value={data.addressLine1}
            onChange={(e) =>
              setData((prev) => ({ ...prev, addressLine1: e.target.value }))
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Addis"
            type="text"
            value={data.city}
            onChange={(e) =>
              setData((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Kosovo"
            type="text"
            value={data.country}
            onChange={(e) =>
              setData((prev) => ({ ...prev, country: e.target.value }))
            }
          />
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2 mb-4 px-5 max-w-4xl">
        <Textarea
          variant="flat"
          label="About me"
          placeholder=""
          className="max-w-5xl bg-white text-sm font-medium"
          value={data.aboutMe}
          onChange={(e) => {
            setData((prev) => ({ ...prev, aboutMe: e.target.value }));
          }}
        />
      </div>

      <button
        type="submit"
        className="bg-neutral-800 w-32 text-white rounded-md h-12 ml-5"
      >
        Save
      </button>
    </form>
  );
}

function handleSubmit(e: { preventDefault: () => void }, data: UserData) {
  e.preventDefault();

  try {
    //data.image = image;
    console.log(data);
    sendPersonalInfo(data);
  } catch (err) {}
}
export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
