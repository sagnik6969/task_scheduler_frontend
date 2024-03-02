import Greeting from '@/components/dashboard/Greeting.vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

describe('greeting', () => {
  it('displays appropriate greeting message', () => {
    const store = {
      state: {
        user: {
          name: 'Sagnik'
        }
      }
    }
    render(Greeting, {
      global: {
        mocks: {
          $store: store
        }
      }
    })

    expect(screen.getByText('Hello Sagnik!')).toBeInTheDocument()
  })
})
