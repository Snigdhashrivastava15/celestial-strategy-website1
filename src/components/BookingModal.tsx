import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiUrl, API_BASE_URL } from '@/lib/api';

interface Astrologer {
  id: string;
  name: string;
  expertise: string[];
  experience: string;
  consultationFee: number;
  currency: string;
  bio: string;
  rating: number;
  totalConsultations: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [loading, setLoading] = useState(false);
  const [astrologer, setAstrologer] = useState<Astrologer | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [timeSlotError, setTimeSlotError] = useState<string>('');
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceType: '',
    scheduledDate: '',
    timeSlot: '',
  });
  const [bookingResult, setBookingResult] = useState<any>(null);
  const { toast } = useToast();

  // DEMO-ONLY: Mock time slots - no backend dependency
  const getMockTimeSlots = (): string[] => {
    return [
      '10:00 AM – 11:00 AM',
      '11:30 AM – 12:30 PM',
      '2:00 PM – 3:00 PM',
      '4:00 PM – 5:00 PM',
    ];
  };

  // DEMO-ONLY: Load astrologer data
  useEffect(() => {
    if (isOpen) {
      fetch(apiUrl('bookings/astrologer'))
        .then(res => res.json())
        .then(data => setAstrologer(data))
        .catch(err => {
          console.error('Failed to load astrologer:', err);
          // Fallback mock astrologer data if backend fails
          setAstrologer({
            id: 'demo-astrologer-1',
            name: 'Astrologer Sameer',
            expertise: ['Vedic Astrology', 'Career Guidance', 'Marriage Compatibility'],
            experience: '15+ years',
            consultationFee: 1999,
            currency: 'INR',
            bio: 'Renowned Vedic astrologer specializing in executive guidance and life-altering decisions.',
            rating: 4.9,
            totalConsultations: 2500,
          });
        });
    }
  }, [isOpen]);

  // DEMO-ONLY: Load available slots when date is selected (using mock data)
  useEffect(() => {
    if (formData.scheduledDate) {
      // Use mock data - no backend dependency
      // Optionally fetch from backend: fetch(`http://localhost:3000/api/bookings/slots?date=${formData.scheduledDate}`)
      const slots = getMockTimeSlots();
      setAvailableSlots(slots);
      // Reset time slot when date changes to prevent invalid selections
      setFormData(prev => ({ ...prev, timeSlot: '' }));
      setTimeSlotError('');
    } else {
      // Clear slots if no date is selected
      setAvailableSlots([]);
      setFormData(prev => ({ ...prev, timeSlot: '' }));
      setTimeSlotError('');
    }
  }, [formData.scheduledDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate time slot selection
    if (!formData.timeSlot) {
      setTimeSlotError('Please select a time slot');
      toast({
        title: "Validation Error",
        description: "Please select a time slot before confirming your booking.",
        variant: "destructive",
      });
      return;
    }

    // Clear any previous errors
    setTimeSlotError('');
    setLoading(true);

    try {
      const response = await fetch(apiUrl('bookings'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingResult(result);
        setStep('confirmation');
        toast({
          title: "Booking Confirmed!",
          description: `Your consultation is scheduled for ${formData.scheduledDate} at ${formData.timeSlot}`,
        });
      } else {
        // Get error details from response
        const errorText = await response.text();
        let errorMessage = 'Booking failed. Please try again.';
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }

        toast({
          title: "Booking Failed",
          description: `Error ${response.status}: ${errorMessage}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      
      // Handle "Failed to fetch" errors specifically
      let errorMessage = "Network error. Please check your connection and try again.";
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Cannot connect to server. Please try again later or contact support if the problem persists.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Booking Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSlotChange = (value: string) => {
    setFormData(prev => ({ ...prev, timeSlot: value }));
    // Clear error when user selects a time slot
    if (timeSlotError) {
      setTimeSlotError('');
    }
  };

  const resetModal = () => {
    setStep('details');
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceType: '',
      scheduledDate: '',
      timeSlot: '',
    });
    setAvailableSlots([]);
    setTimeSlotError('');
    setBookingResult(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-display text-2xl">
            {step === 'details' ? 'Book Your Consultation' : 'Booking Confirmed'}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'details' ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Astrologer Profile - DEMO-ONLY */}
              {astrologer && (
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-foreground">{astrologer.name}</h3>
                      <p className="text-sm text-foreground/70 mb-2">{astrologer.experience} • {astrologer.totalConsultations}+ consultations</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{astrologer.rating}</span>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">{astrologer.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {astrologer.expertise.map((skill, index) => (
                          <span key={index} className="text-xs bg-secondary/20 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-lg font-display text-primary">
                          ₹{astrologer.consultationFee} per consultation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                    <Input
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Type *</label>
                    <Select value={formData.serviceType || undefined} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career">Career Guidance</SelectItem>
                        <SelectItem value="marriage">Marriage Compatibility</SelectItem>
                        <SelectItem value="business">Business Consultation</SelectItem>
                        <SelectItem value="general">General Reading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                    <Input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setFormData(prev => ({ ...prev, scheduledDate: newDate, timeSlot: '' }));
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Slot *</label>
                    <Select
                      value={formData.timeSlot || undefined}
                      onValueChange={handleTimeSlotChange}
                      disabled={!formData.scheduledDate || availableSlots.length === 0}
                    >
                      <SelectTrigger className={timeSlotError ? 'border-destructive' : ''}>
                        <SelectValue placeholder={formData.scheduledDate ? "Select time" : "Select date first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-slots" disabled>
                            No slots available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {timeSlotError && (
                      <p className="text-sm text-destructive mt-1">{timeSlotError}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-foreground/70 mb-4">
                  Your consultation has been scheduled successfully.
                </p>
              </div>

              {bookingResult && (
                <div className="bg-muted/30 p-4 rounded-lg text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Booking Reference:</span>
                      <span className="font-medium">{bookingResult.bookingReference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Date & Time:</span>
                      <span className="font-medium">{bookingResult.scheduledDate} at {bookingResult.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Service:</span>
                      <span className="font-medium">{bookingResult.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Status:</span>
                      <span className="font-medium text-green-600">{bookingResult.status}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-foreground/50 space-y-1">
                <p>• You will receive a confirmation email shortly</p>
                <p>• Join the consultation 5 minutes early</p>
                <p>• Payment will be collected at the time of consultation</p>
              </div>

              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}