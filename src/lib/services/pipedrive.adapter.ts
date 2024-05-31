import { fail } from "@sveltejs/kit";

// create a new "pipedrive" class with methods to submit, addLead, addPerson, addOrganization and with props API_KEY, PIPEDRIVE_SPACE_ID
export class Pipedrive {
  private API_KEY: any;
  private PIPEDRIVE_SPACE_ID: any;
  private fetchUrlBase: string;
  private fetch: (
    input: URL | RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>;
  constructor(
    API_KEY: string,
    PIPEDRIVE_SPACE_ID: string,
    fetch: () => Promise<any>
  ) {
    this.API_KEY = API_KEY;
    this.PIPEDRIVE_SPACE_ID = PIPEDRIVE_SPACE_ID;
    this.fetchUrlBase = `https://${PIPEDRIVE_SPACE_ID}.pipedrive.com/v1`;
    this.fetch = fetch;
  }

  // make function that runs on creation of class instance to create private fetchURlbase

  async submit({
    challenge,
    details,
    idea,
    name,
    email,
    phone,
    companyName,
    privacy,
  }: {
    challenge: string;
    details: string;
    idea: string;
    name: string;
    email: string;
    phone: string;
    companyName: string;
    privacy: boolean;
  }) {
    try {
      const orgRes = await this.addOrganization({ companyName });
      const personRes = await this.addPerson({
        name,
        email,
        phone,
        orgId: orgRes.data.id,
      });
      const leadRes = await this.addLead({
        title: `${name} is looking for help with ${challenge}`,
        details,
        idea,
        personId: personRes.data.id,
        orgId: orgRes.data.id,
      });

      return leadRes;
    } catch (error) {
      return error;
    }
  }

  async addOrganization({ companyName }: { companyName: string }) {
    try {
      const fetchUrl = `${this.fetchUrlBase}/organizations?api_token=${this.API_KEY}`;
      let res = await this.fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: companyName,
          add_time: Date.now(),
          visible_to: "1",
        }),
      });

      if (!res.ok) {
        return fail(500, { error: await res.text() });
      }

      return await res.json();
    } catch (err) {
      return fail(500, { err });
    }
  }

  async addPerson({
    name,
    email,
    phone,
    orgId,
  }: {
    name: string;
    email: string;
    phone: string;
    orgId: number;
  }) {
    try {
      const fetchUrl = `${this.fetchUrlBase}/persons?api_token=${this.API_KEY}`;
      let res = await this.fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          add_time: Date.now(),
          name: name,
          email: [{ value: email }],
          phone: [{ value: phone }],
          org_id: orgId,
          visible_to: "1",
        }),
      });

      if (!res.ok) {
        return fail(500, { error: await res.text() });
      }

      return await res.json();
    } catch (err) {
      return fail(500, { err });
    }
  }

  async addLead({
    title,
    details,
    idea,
    personId,
    orgId,
  }: {
    title: string;
    details: string;
    idea: string;
    personId: number;
    orgId: number;
  }) {
    try {
      const fetchUrl = `${this.fetchUrlBase}/leads?api_token=${this.API_KEY}`;
      let res = await this.fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          add_time: Date.now(),
          title: title,
          person_id: personId,
          org_id: orgId,
          visible_to: "1",
          value: {
            amount: 1000,
            currency: "EUR",
          },
          channel: 24,
          "8cf455eec3e203d5cd95960b9e6dc39020900a57": details,
          "5cdee1db8e2bba943f76430a1cc2109f2291b6c0": idea,
        }),
      });

      if (!res.ok) {
        return fail(500, { error: await res.text() });
      }

      return await res.json();
    } catch (err) {
      return fail(500, { err });
    }
  }
}
