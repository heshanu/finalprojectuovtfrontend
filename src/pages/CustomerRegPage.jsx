import { useState } from "react"
import { User, Phone, Calendar, MapPin, Hotel, Plane, UtensilsCrossed, Coffee } from "lucide-react"
import { useTranslation } from "react-i18next";
export default function CustomerRegistrationForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    age: "",
    address: "",
    accommodation: "",
    travelMode: "",
    foodList: "",
    beverageList: "",
    bookingDate: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      travelMode: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
    alert("Registration submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-xl border-blue-100 dark:border-blue-900">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-4 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Customer Registration</CardTitle>
          <CardDescription className="text-base">Fill in your details to book your travel experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>

            {/* Phone No and Age - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNo" className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-primary" />
                  Age
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="120"
                  className="h-11"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" />
                Address
              </Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Accommodation and Travel Mode - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accommodation" className="flex items-center gap-2 text-base">
                  <Hotel className="h-4 w-4 text-primary" />
                  Accommodation
                </Label>
                <Input
                  id="accommodation"
                  name="accommodation"
                  type="text"
                  placeholder="Hotel/Resort name"
                  value={formData.accommodation}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelMode" className="flex items-center gap-2 text-base">
                  <Plane className="h-4 w-4 text-primary" />
                  Travel Mode
                </Label>
                <Select onValueChange={handleSelectChange} value={formData.travelMode}>
                  <SelectTrigger id="travelMode" className="h-11">
                    <SelectValue placeholder="Select travel mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="cruise">Cruise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Food List */}
            <div className="space-y-2">
              <Label htmlFor="foodList" className="flex items-center gap-2 text-base">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                Food Preferences
              </Label>
              <Textarea
                id="foodList"
                name="foodList"
                placeholder="List your food preferences, dietary restrictions, or special requests..."
                value={formData.foodList}
                onChange={handleInputChange}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Beverage List */}
            <div className="space-y-2">
              <Label htmlFor="beverageList" className="flex items-center gap-2 text-base">
                <Coffee className="h-4 w-4 text-primary" />
                Beverage Preferences
              </Label>
              <Textarea
                id="beverageList"
                name="beverageList"
                placeholder="List your beverage preferences or special requests..."
                value={formData.beverageList}
                onChange={handleInputChange}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Booking Date */}
            <div className="space-y-2">
              <Label htmlFor="bookingDate" className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-primary" />
                Booking Date
              </Label>
              <Input
                id="bookingDate"
                name="bookingDate"
                type="date"
                value={formData.bookingDate}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base font-semibold">
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
