import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SmilePlus, Meh, Frown, Send } from "lucide-react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/TextArea";
import { Button } from "./ui/button";

export type RatingValue = "good" | "neutral" | "bad";

export interface FeedbackCriteria {
  id: string;
  label: string;
}

export interface FeedbackFormData {
  ratings: Record<string, RatingValue>;
  description: string;
  allRated: boolean;
}

interface FeedbackFormProps {
  criteria: FeedbackCriteria[];
  onSubmit: (data: FeedbackFormData) => void | Promise<void>;
  isSubmitting?: boolean;
  title?: string;
  subtitle?: string;
  criteriatitle ?: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
  submitButtonText?: string;
  maxDescriptionLength?: number;
  showAnonymousNotice?: boolean;
}

export const FeedbackForm = ({
  criteria,
  onSubmit,
  title = "Feedback",
  subtitle = "Feedback your class",
  criteriatitle = "Please rate the following criteria",
  descriptionLabel = "Additional Comments (optional)",
  descriptionPlaceholder = "Share any extra thoughts...",
  submitButtonText = "Submit Feedback",
  maxDescriptionLength = 500,
  showAnonymousNotice = true,
}: FeedbackFormProps) => {
  const [ratings, setRatings] = useState<Record<string, RatingValue>>({});
  const [description, setDescription] = useState("");

  const handleRatingChange = (criteriaId: string, value: RatingValue) => {
    setRatings(prev => ({
      ...prev,
      [criteriaId]: value,
    }));
  };

  const handleSubmit = () => {
    const allRated = criteria.every((c) => ratings[c.id]);
    onSubmit({
      ratings,
      description,
      allRated
    });
  };

  const getRatingIcon = (rating: RatingValue) => {
    switch (rating) {
      case "good":
        return <SmilePlus className="w-5 h-5 text-green-500" />;
      case "neutral":
        return <Meh className="w-5 h-5 text-yellow-500" />;
      case "bad":
        return <Frown className="w-5 h-5 text-red-500" />;
    }
  };

  const getRatingLabel = (rating: RatingValue) => {
    switch (rating) {
      case "good":
        return "Good";
      case "neutral":
        return "Neutral";
      case "bad":
        return "Bad";
    }
  };

  return (
    <>
      {/* Feedback Criteria */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="font-semibold text-lg my-3">{criteriatitle}</p>
          {criteria.map((criterion) => (
            <div key={criterion.id} className="space-y-2">
              <Label className="text-base font-medium">{criterion.label}</Label>
              <RadioGroup
                name={`rating-${criterion.id}`}
                value={ratings[criterion.id] || ""}
                onValueChange={(value) => handleRatingChange(criterion.id, value as RatingValue)}
                className="flex gap-4 md:gap-8 my-2"
              >
                {(["good", "neutral", "bad"] as RatingValue[]).map((rating) => (
                  <RadioGroupItem key={rating} className="flex items-center w-26" value={rating} id={`${criterion.id}-${rating}`}>
                    <Label
                      htmlFor={`${criterion.id}-${rating}`}
                      className="flex items-center gap-2 cursor-pointer font-normal"
                    >
                      {getRatingIcon(rating)}
                      {getRatingLabel(rating)}
                    </Label>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>
          ))}

        {/* Description */}
        <div className="space-y-2 my-6">
          <Label htmlFor="description " className="font-semibold text-lg my-4">
            {descriptionLabel}
          </Label>
          <Textarea
            id="description"
            placeholder={descriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] resize-none"
            maxLength={maxDescriptionLength}
          />
          <p className="text-xs text-gradient-600 text-right">
            {description.length}/{maxDescriptionLength} characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-primary hover:opacity-90"
          >
            <Send className="w-4 h-4 mr-2" />
            {submitButtonText}
          </Button>
        </div>

      {/* Anonymous Notice */}
      {showAnonymousNotice && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-gradient-600 text-center">
            🔒 Your evaluation is completely anonymous.
          </p>
        </div>
      )}
      </CardContent>
    </>
  );
};
