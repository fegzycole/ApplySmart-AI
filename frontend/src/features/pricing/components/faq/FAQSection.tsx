import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FAQ_STYLES, FAQ_ITEMS } from "../../constants/pricing.constants";

export function FAQSection() {
  return (
    <section className={FAQ_STYLES.section}>
      <div className={FAQ_STYLES.wrapper}>
        <div className={FAQ_STYLES.header.container}>
          <h2 className={FAQ_STYLES.header.title}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className={FAQ_STYLES.list}>
          {FAQ_ITEMS.map((faq, index) => (
            <Card key={index} className={FAQ_STYLES.card}>
              <CardHeader>
                <CardTitle className={FAQ_STYLES.question}>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={FAQ_STYLES.answer}>{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
