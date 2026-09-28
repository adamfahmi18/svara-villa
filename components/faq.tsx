import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  ["What time is check-in?", "Check-in is from 3:00 PM. Check-out is by 11:00 AM, giving our team time to prepare each villa carefully."],
  ["Is breakfast included?", "Yes. A daily à la carte breakfast is included for registered guests and can be served in your villa."],
  ["Do you provide airport transfers?", "Yes. Private airport transfers can be added during booking or arranged with our host before arrival."],
  ["Can I request early check-in?", "We will always try. Early check-in depends on the previous night's occupancy and is confirmed the day before arrival."],
  ["Are children allowed?", "Children are welcome. Pool areas are unsupervised, so younger guests must remain with an adult."],
  ["Can I change my reservation?", "For this portfolio demo, changes are not processed. A real property would confirm its amendment policy before payment."],
];

export function Faq() {
  return (
    <Accordion type="single" collapsible className="faq-list">
      {faqs.map(([question, answer], index) => (
        <AccordionItem key={question} value={`item-${index}`}>
          <AccordionTrigger className="faq-trigger"><span><small>0{index + 1}</small>{question}</span></AccordionTrigger>
          <AccordionContent className="faq-content">{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
