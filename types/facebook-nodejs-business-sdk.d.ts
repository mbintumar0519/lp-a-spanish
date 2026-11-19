declare module "facebook-nodejs-business-sdk" {
  export class FacebookAdsApi {
    static init(accessToken: string): FacebookAdsApi;
  }

  export class UserData {
    setClientIpAddress(value: string): this;
    setClientUserAgent(value: string): this;
    setFbp(value: string): this;
    setFbc(value: string): this;
    setEmail(value: string): this;
    setPhone(value: string): this;
    setFirstName(value: string): this;
    setLastName(value: string): this;
    setCity(value: string): this;
    setState(value: string): this;
    setZip(value: string): this;
    setCountry(value: string): this;
    setDateOfBirth(value: string): this;
    setExternalId(value: string): this;
  }

  export class CustomData {
    setValue(value: number): this;
    setCurrency(value: string): this;
    setContentCategory(value: string): this;
    setContentName(value: string): this;
  }

  export class ServerEvent {
    setEventName(value: string): this;
    setEventTime(value: number): this;
    setUserData(value: UserData): this;
    setCustomData(value: CustomData): this;
    setEventSourceUrl(value: string): this;
    setActionSource(value: string): this;
    setEventId(value: string): this;
  }

  export class EventRequest {
    constructor(accessToken: string, pixelId: string);
    setEvents(events: ServerEvent[]): this;
    setTestEventCode(value: string): this;
    execute(): Promise<unknown>;
  }
}
