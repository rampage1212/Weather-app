export interface Props {
  activeCity: string;
  updateData: (city: string) => Promise<void>;
}
