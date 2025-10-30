import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Initiative } from './types';

const initiativeSchema = z.object({
  processNumber: z.string().min(1, 'Process number is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['planned', 'in progress', 'completed', 'on hold']),
  startDate: z.string().min(1, 'Start date is required'),
  completionDate: z.string().min(1, 'Completion date is required'),
}).refine((data) => {
  return new Date(data.startDate) <= new Date(data.completionDate);
}, {
  message: 'Completion date must be after start date',
  path: ['completionDate'],
});

type InitiativeFormData = z.infer<typeof initiativeSchema>;

interface InitiativeFormProps {
  initiative: Initiative | null;
  onSave: (data: { processNumber: string; name: string; description: string; status: Initiative['status']; startDate: string; completionDate: string }) => void;
  onCancel: () => void;
}

export function InitiativeForm({ initiative, onSave, onCancel }: InitiativeFormProps) {
  const form = useForm<InitiativeFormData>({
    resolver: zodResolver(initiativeSchema),
    defaultValues: {
      processNumber: initiative?.processNumber || '',
      name: initiative?.name || '',
      description: initiative?.description || '',
      status: initiative?.status || 'planned',
      startDate: initiative?.startDate || '',
      completionDate: initiative?.completionDate || '',
    },
  });

  const onSubmit = (data: InitiativeFormData) => {
    onSave(data as { processNumber: string; name: string; description: string; status: Initiative['status']; startDate: string; completionDate: string });
    form.reset();
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initiative ? 'Edit Initiative' : 'Create New Initiative'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="processNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Process Number</FormLabel>
                  <FormControl>
                    <Input placeholder="PI-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Initiative name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the initiative..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Completion Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {initiative ? 'Update' : 'Create'} Initiative
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
