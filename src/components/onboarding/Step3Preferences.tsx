"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Preferences } from "@/types";

const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: "Please select a theme preference.",
  }),
  defaultDashboardLayout: z.enum(['compact', 'spacious', 'widgets'], {
    required_error: "Please select a default dashboard layout.",
  }),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

interface Step3Props {
  data?: Preferences;
  onSubmit: (data: PreferencesFormData) => void;
  onBack: () => void;
}

export default function Step3Preferences({ data, onSubmit: finalSubmit, onBack }: Step3Props) {
  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: data || { theme: undefined, defaultDashboardLayout: undefined },
  });

  const handleFormSubmit: SubmitHandler<PreferencesFormData> = (formData) => {
    finalSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultDashboardLayout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Dashboard Layout</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                  <SelectItem value="widgets">Widgets</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
